
export type Role = 'skipper' | 'luminous';

export interface ChatMessage {
  role: Role;
  content: string;
}
