import { useQuery, QueryClient, QueryClientProvider, QueryCache, useMutation, QueryFunction } from 'react-query';

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache
});

const users = [{
  id: 0,
  name: 'John0'
}, {
  id: 1,
  name: 'John1'
}, {
  id: 2,
  name: 'John2'
}];

const fetchUser = async (id) => {

  console.log('fetch user:', id);
  //if (userId === null) return queryCache.getQueryData([key, 2]);

  const user = await new Promise(resolve => setTimeout(
    () => resolve(users[id]),
    1000
  ));
  return user;
}

function QueryExample() {

  console.log('QueryExample');

  const [userId, setUserId] = useState(null);

  const { data, isFetching } = useQuery<any>(['user', userId], () => fetchUser(userId), {
    enabled: userId !== null,
    // cacheTime: 0,
    // cacheTime: 1000000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  // console.log(queryCache);
  // console.log(queryClient);
  console.log(queryClient.getQueryData('user', { active: true }));
  console.log(queryCache.find('user', { active: true }));
  // console.log(queryCache.findAll('user', { 
  //   active: true
  // }));

  return <div>

    <div>
      <button onClick={() => setUserId(0)}>user 0</button>
      <button onClick={() => setUserId(1)}>user 1</button>
      <button onClick={() => setUserId(2)}>user 2</button>
      <button onClick={() => setUserId(null)}>no user</button>
    </div>

    <div>
      <button onClick={() => queryClient.refetchQueries('user', { active: true })}>refetch</button>
      <button onClick={() => {
        const queryKey = queryClient.getQueryCache().find('user', { active: true }).queryKey;
        queryClient.setQueryData(queryKey, { name: 'John22' });
      }}>cahnge</button>
    </div>

    {/* <div>
      {isFetching
        ? '...loading'
        : <>
          {data?.name}
        </>
      }
    </div> */}
    <div>
      {isFetching && '...loading'}
      <div>
        {data?.name}
      </div>
    </div>

  </div>;
}

export default () => {
  return <QueryClientProvider client={queryClient} >
    <QueryExample />
  </QueryClientProvider>;
};