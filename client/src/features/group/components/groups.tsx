import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

import {
  Arrow,
  GroupsContainer,
  Menu,
  ModalFooter,
  Text,
} from '@/features/group';
import { useGetGroups } from '@/features/group/api/get-groups.ts';
import { useJoinGroup } from '@/features/group/api/join-group.ts';
import { AuthContext, AuthContextType } from '@/lib/auth-context.tsx';
import { SocketContext } from '@/lib/socket-context.tsx';
import { GroupSocket } from '@/socket/group-socket.ts';

type GroupsProps = {
  goBack: (e: 'add' | 'group' | null) => void;
};
export const Groups = ({ goBack }: GroupsProps) => {
  const { groups, isLoading, error } = useGetGroups();
  const { mutate } = useJoinGroup();
  const { user } = useContext(AuthContext) as AuthContextType;
  const socket = useContext(SocketContext)?.socket;
  const groupSocket = useRef<GroupSocket | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket) {
      groupSocket.current = new GroupSocket(socket);
    }
  }, []);

  function joinGroupHandler(selectedGroup: string) {
    if (!user) return;
    setSelectedGroupId(selectedGroup);
    setLoading(true);
    mutate(
      { groupId: selectedGroup, userId: user._id },
      {
        onSuccess: () => {
          groupSocket.current?.joinGroup(selectedGroup, user._id);
          toast.success('Joined group successfully');
          queryClient.invalidateQueries({ queryKey: ['groups'] });
          setLoading(false);
        },
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('Failed to join the group.');
          }
          setLoading(false);
        },
      },
    );
  }

  if (isLoading)
    return (
      <GroupsContainer className="content-center items-center justify-center ">
        <span className="loading loading-bars loading-lg text-success"></span>
      </GroupsContainer>
    );
  if (error) return <GroupsContainer>Error: {error.message}</GroupsContainer>;

  return (
    <GroupsContainer>
      <p className="text-sm font-normal text-black">
        Join a group by selecting one from the list below
      </p>
      <Menu className="my-3 h-[30vh] space-y-3 overflow-y-auto bg-gray-50 p-4">
        {groups?.map((group, index) => (
          <li
            className="group flex cursor-pointer items-center rounded-lg bg-gray-200 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow"
            key={index}
            onClick={() =>
              !group.members.includes(user?._id as string) &&
              joinGroupHandler(group._id)
            }
          >
            <Text>{group.name}</Text>
            <Arrow>
              {loading && group._id === selectedGroupId ? (
                <span className="loading loading-spinner"></span>
              ) : group.members.includes(user?._id as string) ? (
                <span className="ms-3 inline-flex items-center justify-center rounded bg-black px-2 py-0.5 text-xs font-medium text-gray-200">
                  Joined
                </span>
              ) : (
                <IoChevronForwardOutline size={20} color={'lightgrey'} />
              )}
            </Arrow>
          </li>
        ))}
      </Menu>

      <ModalFooter className="justify-between">
        <button className="btn" onClick={() => goBack(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
            className="back-button-icon"
          >
            <path
              d="M10 6L4 12L10 18"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </ModalFooter>
    </GroupsContainer>
  );
};
