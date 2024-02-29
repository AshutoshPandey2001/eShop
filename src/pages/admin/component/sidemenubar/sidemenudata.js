// import HomeIcon from '@mui/icons-material/Home';
// import TravelExploreIcon from '@mui/icons-material/TravelExplore';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import SettingsIcon from '@mui/icons-material/Settings';
import { GrProductHunt } from 'react-icons/gr'
import { BsCart4 } from 'react-icons/bs'

export const sidemenuData = [
    {
        id: 0,
        icon: <GrProductHunt size={30} />,
        text: "Products",
        link: "products"
    },
    {
        id: 1,
        icon: <BsCart4 size={30} />,
        text: "Orders",
        link: "orders"
    },

]