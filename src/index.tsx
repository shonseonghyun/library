import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import App from './App';
import OurError from './error/OurError';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const queryErrorHandler = (error:any) => {
  console.log("queryErrorHandler");
  // toast(`데이터를 가져오지 못했습니다! ${error.message}`);
};


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      useErrorBoundary:true,
      // onError:OurError,
      retry:0,
      // useErrorBoundary:true
      // suspense:true
      // 
    }
  }
});

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <CookiesProvider>
          <App />
      </CookiesProvider>
    </RecoilRoot>
  </QueryClientProvider>
);
