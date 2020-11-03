import { useQuery, useMutation, QueryConfig, queryCache } from 'react-query';

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

async function fetchUser(key, { userId }) {

  if (userId === null) return queryCache.getQueryData([key, 2]);

  const user = await new Promise(resolve => setTimeout(
    () => resolve(users[userId]),
    1000
  ));
  return user;
}

function QueryExample() {

  console.log('QueryExample');

  const [userId, setUserId] = useState(null);

  const { data, isFetching } = useQuery<any>(['user', { userId }], fetchUser, {
    enabled: userId !== null,
    cacheTime: 0,
    //cacheTime: 1000000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  console.log(queryCache.getQueries(['user'])[0]);
  //console.log(queryCache.getQueries(['user']).filter(q => q.gcTimeout === undefined)[0]);

  return <div>

    <div>
      <button onClick={() => setUserId(0)}>user 0</button>
      <button onClick={() => setUserId(1)}>user 1</button>
      <button onClick={() => setUserId(2)}>user 2</button>
      <button onClick={() => setUserId(null)}>no user</button>
    </div>

    <div>
      <button onClick={() => queryCache.refetchQueries(['user'])}>refetch</button>
    </div>

    <div>
      {isFetching
        ? '...loading'
        : <>
          {data?.name}
        </>
      }
    </div>

  </div>;
}

export default QueryExample;