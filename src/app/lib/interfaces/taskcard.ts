export interface TaskCardProps {
  label: string;
  labelColor: string;
  title: string;
  members: string[];
  dueDate?: string;
  priority: string;
  shareCount: number;
  messageCount: number;
  footerType:
    | "due"
    | "reports"
    | "stream"
    | "groupCall"
    | "link"
    | "counts"
    | "image"
    | "none";
  imageUrl?: string; // optional image
}
