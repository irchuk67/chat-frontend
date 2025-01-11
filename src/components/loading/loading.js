import ReactLoading from 'react-loading';
import './loading.scss';

const Loading = () => {
    return (
        <ReactLoading
            type={'bars'}
            color={'#93867F'}
            height={'10rem'}
            width={'10rem'}
            className={'loading'}
        />
    );
};

export default Loading;