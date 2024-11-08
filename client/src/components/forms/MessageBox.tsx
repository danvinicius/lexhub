import { FC } from 'react';
import './MessageBox.scss';

export enum MessageBoxTheme {
    SUCCESS,
    ERROR
}

interface MessageBoxProps {
  message: string;
  theme: MessageBoxTheme
}

const MessageBox: FC<MessageBoxProps> = ({ message, theme }: MessageBoxProps) => {
	return (
		<div className={`messageBox ${theme == MessageBoxTheme.SUCCESS ? 'success' : 'error'}`} >
			<p>{message}</p>
		</div>
	);
};

export default MessageBox;
