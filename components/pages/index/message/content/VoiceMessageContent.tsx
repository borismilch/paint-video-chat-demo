import React from 'react';

import { IVoiceMessage } from '@/models/.'

interface VoiceMessageProps {
  message: IVoiceMessage
}

const VoiceMessageContent: React.FC<VoiceMessageProps> = ({message}) => {
  return (
    <div>

      <audio src={message.body.url} controls />

    </div>
  )
};

export default VoiceMessageContent;
