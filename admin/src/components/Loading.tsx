import { LoaderCircle } from 'lucide-react'

type Props = {
    text?: string
}

const Loading: React.FC<Props> = ({ text }) => {
    return (
        <div className="p-3 flex justify-center flex-col items-center">
            <LoaderCircle size={28} className="animate-spin" />
            <div>{text}</div>
        </div>
    )
}

export default Loading
