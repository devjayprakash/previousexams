import { Button } from 'antd'
import BrandIcon from '../brand'

const Navbar: React.FC = () => {
    return (
        <nav className="w-full flex justify-between p-3">
            <BrandIcon />
            <ul className="flex gap-3 items-center text-sm">
                <li>home</li>
                <li>about</li>
                <li>upload</li>
            </ul>
            <Button type="primary">Sign up</Button>
        </nav>
    )
}

export default Navbar
