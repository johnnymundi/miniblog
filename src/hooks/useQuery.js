// useMemo pode ser usado para referenciar duas variáveis e verificar o que muda entre elas ao longo do uso. Bom para a parte de edição do TargetSet
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// essa função só vai ser executada quando o search for alterado
export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
