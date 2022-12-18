import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import PlatformService from '../api/PlatformService';

const NotificationsPage = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    return isLoading ? (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
                <span className="sr-only">Fetching...</span>
            </Spinner>
        </div>
    ) : (
        <div>
            Some component
        </div>
    );
};

export default NotificationsPage;
