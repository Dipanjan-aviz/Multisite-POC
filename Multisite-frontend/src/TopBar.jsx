import React from 'react';
// import { useLocation, useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
// import { IconButton, Tooltip } from '@mui/material';
import avizLogo from './headerlogo.svg';
// import { ACTIONS } from '../store/actions';

function TopBar({ isSidebarExpanded }) {
  //const dispatch = useDispatch();
  const [dialogOpenCheck, setDialogOpenCheck] = React.useState(false);
  //const headerState = useSelector((state) => state.headerReducer.headerStatus);
  // const { showConversation } = headerState;

//   const location = useLocation();

//   const navigate = useNavigate();

//   const path = location.pathname;
//   const handleClose = () => {
//     setDialogOpenCheck(false);
//     setCheckForLLMDone(true);
//   };

  // const handleBack = () => {
  //   dispatch({
  //     type: ACTIONS.ENABLE_BACK_BUTTON,
  //     payload: {
  //       showConversation: false,
  //     },
  //   });
  // };

  return (
    <div className='main-header'>
      <div className='logo'>
        <img src={avizLogo} alt='' />
      </div>
      {/* <div className='topbar-padding w-16 shrink-0 duration-200'></div> */}
        <div></div>
      {/* added Info popup in header */}
    </div>
  );
}

// function IconRenderer({ Icon }) {
//   return (
//     <div className=''>
//       <Icon factor={0.8} />
//     </div>
//   );
// }

export default TopBar;