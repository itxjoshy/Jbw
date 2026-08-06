import { useNavigate, useLocation } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import video from "../assets/video.mp4";

const DEFAULT_TITLE = "Princess : Chapter 20";

function WatchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <VideoPlayer
      src={video}
      title={DEFAULT_TITLE}
      onClose={() => navigate("/home")}
      onBack={() => navigate(-1)}
    />
  );
}

export default WatchPage;
