import React from 'react'
import Card from "../../components/Card";
import { Grid, GridItem, Box, Flex, Button } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider, useQuery, useInfiniteQuery } from 'react-query'
import { fetchProductList } from "../../api";

function Producs() {
    // products-> key: datayı daha sonra çekmek için kullanılır
    // fetch fonksiyonu api'de tanımlanıp export edildi
    // const { isLoading, error, data } = useQuery(['products'], fetchProductList
    // () =>
    // fetch('http://localhost:4000/product').then(res =>
    //   res.json()
    // )
    
  // )

  // sayfada gösterilecek maks sayısı 12 old için sayfayı aşağı kaydırınca diğerleri de yüklenmeli
  const {data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    } = useInfiniteQuery(["product"], fetchProductList, {
    getNextPageParam: (lastPage, allPages) => {
        const morePagesExist = lastPage?.length === 12;
        if (!morePagesExist) {
            return;
        }
        return allPages.length + 1;
    }
  });

  console.log("data", data);

  if (status == "loading") return 'Loading...'

  if (status == "error") return 'An error has occurred: ' + error.message
  
    return (
    <div>
        {/* repeat-> ilk parametre bir satırda kaç boşluk olacağı */}
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {/* {data.map((item, key) => {
            return (
                <Card key={key} item={item}></Card>
            );
        })}; */}
        {
          data.pages.map((page, i) => (
             <React.Fragment key={i} >
              {page.map((item, key) => (
                <Box w="100%" key={item._id} >
                  <Card item={item} ></Card>
                </Box>
              ))}
             </React.Fragment>
          ))
        }
      </Grid>
      {/* mt-> margin-top */}
      <Flex mt="10" justifyContent="center" >
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </Flex>

    </div>
  )
}

export default Producs
