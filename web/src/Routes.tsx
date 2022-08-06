import {BrowserRouter, Routes as rt, Route} from 'react-router-dom';

const Routes: React.FC = () => {
    return (
      <BrowserRouter>
        <rt>
          <Route path="/" element={
          <div>oiiii</div>
          } />
        </rt>
      </BrowserRouter>
    );
};

export default Routes;