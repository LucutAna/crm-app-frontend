import './Sidebar.css';
import {NavLink} from 'react-router-dom'

const Sidebar = ({onConfiguration}) => {
    console.log(onConfiguration);
    return (
        <div className='container-sidebar'>
            <h3>Sidebar</h3>
            <ul>
                <li>
                    <NavLink to='/crm'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='/order-history'>Order-history</NavLink>
                </li>
                <li>
                    <NavLink to='/coupons'>Coupons</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;