import { useNavigate } from "react-router-dom";

function FridgeCard({ fridgeName, fridgeId }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/userfridge/${fridgeId}`);
    };

    return (
        <div
            className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer"
            onClick={handleClick}
            >
            <h2 className="text-xl font-bold text-gray-800">{fridgeName}</h2>
        </div>
    );
}

export default FridgeCard;
