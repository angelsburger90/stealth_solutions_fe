import MenuFilter from "@components/menu.filter.component";
import UserCard from "@components/user.card.component";
import { useUsersStore } from "@hooks/user.store.hooks";
import { Box } from "@mui/material";

const UserDetailsPage = (): JSX.Element => {
    const {userDetails} = useUsersStore();
    return (
        <>
            <MenuFilter></MenuFilter>
            <Box className="flex mt-4 items-center flex-col justify-center">
                {userDetails && (
                    <UserCard userDetails={userDetails}/>
                )}
            </Box>
        </>
    );
}

export default UserDetailsPage;