import Navbar from '../components/navbar'

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="container mx-auto">
            <Navbar />
            {children}
        </div>
    )
}

export default AppLayout
