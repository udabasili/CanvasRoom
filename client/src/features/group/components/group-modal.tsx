import React, { FC, useState } from 'react';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoAddOutline, IoChevronForwardOutline } from 'react-icons/io5';

import { Modal } from '@/components/elements';
import { Arrow, IconWrapper, Menu, Text } from '@/features/group';
import { GroupForm } from '@/features/group/components/group-form.tsx';
import { Groups } from '@/features/group/components/groups.tsx';

type GroupModalProps = {
  show: boolean;
  onClose: () => void;
};

type CustomProps = {
  onSuccess: () => void;
  goBack: (e: 'add' | 'group' | null) => void;
};

type ComponentTypes = {
  [key: string]: React.FC<CustomProps>;
};

export const GroupModal = ({ show, onClose }: GroupModalProps) => {
  const [menu, setMenu] = useState<'add' | 'group' | null>(null);
  let Component: FC<CustomProps> | null = null;

  function handleConfirm() {}

  function closeModal() {
    onClose();
    setMenu(null);
  }

  function onSuccess() {}

  const COMPONENT_MAP: ComponentTypes = {
    add: GroupForm,
    group: Groups,
  };

  if (menu) {
    Component = COMPONENT_MAP[menu];
  }

  function handleMenu(e: 'add' | 'group' | null) {
    setMenu(e);
  }

  return (
    <Modal
      show={show}
      onClose={closeModal}
      title={
        menu === 'add'
          ? 'Create Group'
          : menu === 'group'
            ? 'Join Group'
            : 'Get Started'
      }
      onConfirm={handleConfirm}
    >
      {!menu ? (
        <Menu className="space-y-3">
          <li
            onClick={() => handleMenu('add')}
            className="group flex cursor-pointer items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow"
          >
            <IconWrapper>
              <IoAddOutline size={20} color={'white'} />
            </IconWrapper>
            <Text>Create My Own</Text>
            <Arrow>
              <IoChevronForwardOutline size={20} color={'lightgrey'} />
            </Arrow>
          </li>
          <li
            onClick={() => handleMenu('group')}
            className="group flex cursor-pointer items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow"
          >
            <IconWrapper>
              <FaPeopleGroup size={20} color={'white'} />
            </IconWrapper>
            <Text>Join Group</Text>
            <Arrow>
              <IoChevronForwardOutline size={20} color={'lightgrey'} />
            </Arrow>
          </li>
        </Menu>
      ) : (
        Component != null && (
          <Component onSuccess={onSuccess} goBack={handleMenu} />
        )
      )}
    </Modal>
  );
};
