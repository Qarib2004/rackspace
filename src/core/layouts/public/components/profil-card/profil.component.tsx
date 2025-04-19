import { useGetAllUsers, useGetAllUsersForSeller } from '../header/actions/header.query';
import UsersPage from './user-card.component';


const ProfilCard = () => {
  const { data: users, isLoading, isError } = useGetAllUsersForSeller();
  const sellers = users?.filter(user => user.type === 'seller');

  if (isLoading) return <div>Yüklənir...</div>;
  if (isError) return <div>Xəta baş verdi</div>;

  return <UsersPage users={users || []} />;
  
};

export default ProfilCard;
