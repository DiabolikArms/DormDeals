import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import categories from './CategoriesList';

function Categories(props) {

    const navigate = useNavigate();

    return (
        <div className='cat-container'>
            <div>
            <span className='pr-3' style={{ cursor: 'pointer' , fontWeight: 'bold'}}><Link to="/" className='category' style={{ textDecoration: 'none'}}>All Categories</Link></span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span onClick={() => navigate('/category/' + item)} key={index} className='category'> {item} </span>
                        )
                    })}
            </div>
        </div>
    )
}


export default Categories;