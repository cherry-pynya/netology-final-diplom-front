import PropTypes from 'prop-types';
import AdminContext from './AdminContext';

export default function AdminProvider(props) {
    return (
        <AdminContext.Provider value={{}}>
            {props.children}
        </AdminContext.Provider>
    );
}

AdminProvider.propTypes = {
    children: PropTypes.node,
};