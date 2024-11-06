
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <>
            <Link to="/Demo1">
                <button>1</button>
            </Link>
            <Link to="/Demo2">
                <button>2</button>
            </Link>
        </>
    );
}

export default Dashboard;

