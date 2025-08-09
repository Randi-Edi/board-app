export interface Task {
  label: string;
  labelColor: string;
  title: string;
  members: string[];
  dueDate?: string;
  priority: string;
  shareCount?: number;
  messageCount?: number;
  footerType?: string;
  imageUrl?: string;
}
