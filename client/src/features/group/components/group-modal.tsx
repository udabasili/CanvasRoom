import { FC, useState } from 'react';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoAddOutline, IoChevronForwardOutline } from 'react-icons/io5';

import { Modal } from '@/components/elements';
import { Arrow, IconWrapper, Menu, MenuItem, Text } from '@/features/group';
import { GroupForm } from '@/features/group/components/group-form.tsx';
import { Groups } from '@/features/group/components/groups.tsx';

type GroupModalProps = {
	show: boolean;
	onClose: () => void;
};

type CustomProps = {
	onSuccess: () => void;
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
						: ''
			}
			onConfirm={handleConfirm}
		>
			{!menu ? (
				<Menu>
					<MenuItem onClick={() => handleMenu('add')}>
						<IconWrapper>
							<IoAddOutline size={20} color={'white'} />
						</IconWrapper>
						<Text>Create My Own</Text>
						<Arrow>
							<IoChevronForwardOutline
								size={20}
								color={'lightgrey'}
							/>
						</Arrow>
					</MenuItem>
					<MenuItem onClick={() => handleMenu('group')}>
						<IconWrapper>
							<FaPeopleGroup size={20} color={'white'} />
						</IconWrapper>
						<Text>Join Group</Text>
						<Arrow>
							<IoChevronForwardOutline
								size={20}
								color={'lightgrey'}
							/>
						</Arrow>
					</MenuItem>
				</Menu>
			) : (
				Component != null && <Component onSuccess={onSuccess} />
			)}
		</Modal>
	);
};
