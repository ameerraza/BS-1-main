import Link from "next/link";
import { FaComments } from "react-icons/fa";

const ChatIcon = () => {
  return (
    <Link href="/chat">
      <div className="fixed bottom-6 right-6 bg-primary p-4 rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-all">
        <FaComments className="text-white text-2xl" />
      </div>
    </Link>
  );
};

export default ChatIcon;
