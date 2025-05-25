
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsSubwayFilledIcon from '@mui/icons-material/DirectionsSubwayFilled';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ChairIcon from '@mui/icons-material/Chair';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const categoryIconMap = {
  shopping: ShoppingCartIcon,
  fixed_expenses: PaymentsIcon,
  eat_out: RestaurantIcon,
  public_transports: DirectionsSubwayFilledIcon,
  car: DirectionsCarIcon,
  for_me: PersonIcon,
  entertainment: TheaterComedyIcon,
  health: HealthAndSafetyIcon,
  vacation: BeachAccessIcon,
  house: ChairIcon,
  subscriptions: SubscriptionsIcon,
  gifts: CardGiftcardIcon,
  education: SchoolIcon,
  bank: AccountBalanceIcon,
  income: MonetizationOnIcon,
};

export default function CategoryIcon({ category }) {
  const IconComponent = categoryIconMap[category.icon_key] || PaymentsIcon;

  return (
    <>
      <IconComponent fontSize="8px" sx={{ mr: 1 }} />
      {category.name}
    </>
  );
}