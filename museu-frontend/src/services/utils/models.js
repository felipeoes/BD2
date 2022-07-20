import {
  MdCalendarToday,
  MdCode,
  MdFilterTiltShift,
  MdSearch,
} from "react-icons/md";

export const modelsColumns = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "# ID",
    align: "center",
    icon: "",
    filter: "",
  },
  {
    id: "data",
    numeric: false,
    disablePadding: false,
    label: "Dados de entrada",
    align: "center",
  },
  {
    id: "predicted",
    numeric: false,
    disablePadding: false,
    label: "Predito",
    align: "center",
    icon: MdFilterTiltShift,
  },
  {
    id: "model",
    numeric: false,
    disablePadding: false,
    label: "Modelo",
    align: "center",
    icon: MdSearch,
  },
  {
    id: "execution_time",
    numeric: true,
    disablePadding: false,
    label: "Tempo de execução",
    align: "left",
    icon: MdCode,
    //   FilterView: LanguageFilterView,
    select: true,
  },
  {
    id: "date_predicted",
    numeric: false,
    disablePadding: false,
    label: "Data/hora predição",
    align: "left",
    icon: MdCalendarToday,
  },

  {
    id: "updated_at",
    numeric: false,
    disablePadding: true,
    label: "Atualizado em",
    align: "center",
    icon: "",
  },
];