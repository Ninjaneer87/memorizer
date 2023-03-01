import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  denied: boolean;
  redirectTo: string;
};

function ProtectedRoutes({ denied, redirectTo }: Props) {
  return denied ? <Navigate to={redirectTo} replace /> : <Outlet />
}
export default ProtectedRoutes