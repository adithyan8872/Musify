import { Outlet } from "react-router-dom";

// Sidebar is rendered by Layout for all /albums/* routes
const AlbumContainer = () => <Outlet />;

export default AlbumContainer;
