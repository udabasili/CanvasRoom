import { useContext } from 'react';

import { Channel, ChannelContainer } from '@/features/channel';
import { CloseButton } from '@/features/dashboard';
import { ThemeContext } from '@/lib/side-drawer-context.tsx';

type ChannelsType = {
  channels: Channel[];
  setChannel: (channel: Channel) => void;
  selectedChanel?: Channel | null;
};
export const Channels = ({
  channels,
  setChannel,
  selectedChanel,
}: ChannelsType) => {
  const theme = useContext(ThemeContext);

  return (
    <ChannelContainer isVisible={theme?.isOpen}>
      <CloseButton onClick={theme?.close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          width="36px"
          height="36px"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </CloseButton>
      <ul className="menu w-56 bg-base-200">
        <li className="menu-title">Channels</li>

        {channels.map((channel) => (
          <li
            onClick={() => setChannel(channel)}
            className={`menu-item ${selectedChanel?._id === channel._id ? 'active' : ''}`}
            key={channel._id}
          >
            {channel.name}
          </li>
        ))}
      </ul>
    </ChannelContainer>
  );
};
