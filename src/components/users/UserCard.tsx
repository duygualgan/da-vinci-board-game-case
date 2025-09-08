import { useNavigate } from "react-router-dom";
import type { User } from "../../types";
import ActionButtons from "../ActionButtons";
import { scrollToTop } from "../../utils/scroll";

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
       scrollToTop();
        navigate(`/users/${user.id}`)}}
      className="cursor-pointer rounded-xl shadow-md bg-white p-5 hover:shadow-xl transition duration-300 hover:-translate-y-1 relative"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[2rem]">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">{user.phone}</p>
      </div>
       <ActionButtons item={user} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default UserCard;
