import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const queryErrorHandler = (error:any) => {
  alert("데이터를 불러올 수 없습니다. 재시도 부탁드립니다.");
};

export const mutateErrorHandler = (error:any) => {
  alert("사용자 요청에 실패하였습니다. 잠시 후 다시 시도 바랍니다");
};

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      useErrorBoundary:true,
      refetchOnWindowFocus:true,
      onError: queryErrorHandler,
      retry:0,
    },
    mutations:{
      onError:mutateErrorHandler,
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
