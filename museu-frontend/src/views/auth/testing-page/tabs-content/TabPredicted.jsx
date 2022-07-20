import { TabPredictedContent } from "./styles";

export default function TabPredicted({ predicted }) {
  const predicao = predicted?.predicao;
  let isList = Array.isArray(predicao);

  return (
    <TabPredictedContent>
      {predicao ? (
        <div>
          <h1>Predição</h1>
          {isList ? (
            predicao.map((prediction, index) => (
              <p style={{ marginTop: 2 }} key={index}>
                {prediction}
              </p>
            ))
          ) : (
            <p>{predicao}</p>
          )}

          {/* <p>{predicao}</p> */}
        </div>
      ) : (
        <div>
          <h1>Predição</h1>
          <p>
            Não há predição, configure os valores das variáveis e aperte em
            realizar teste
          </p>
        </div>
      )}
    </TabPredictedContent>
  );
}
