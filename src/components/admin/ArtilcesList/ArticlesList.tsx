import {
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { Article } from "../../../store/articles/types";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import "./ArticlesList.scss";
import { setSelectedArticle } from "../../../store/articles";
import { useNavigate } from "react-router";

type Meta = {
  leftCount: number;
  prevPage: number | null;
  nextPage: number | null;
};

export const ArticlesList = () => {
  const [list, setList] = useState<Array<Article>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [amount, setAmount] = useState(20);
  const [allAmount, setAllAmount] = useState(0);
  const [amountPages, setAmountPages] = useState(0);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [search, setSearch] = useState<String>("");
  const pageAmounts = [10, 20, 50, 100];
  const navigate = useNavigate();

  useEffect(() => {
    getPage();
  }, [pageNumber, amount]);

  const getPage = () => {
    axiosInstance
      .get(`/post?page=${pageNumber}&amount=${amount}&search=${search}`)
      .then((items) => {
        console.log(items);
        setMeta(items.data.meta);
        setList(items.data.data.rows);
        setAllAmount(items.data.data.count);
        setAmountPages(Math.ceil(items.data.data.count / amount));
      });
  };

  const setHiddenStatus = async (
    value: boolean,
    item: Article,
    index: number
  ) => {
    const result = (
      await axiosInstance.put(`/post/hidden/${item.uuid}`, {
        value,
      })
    ).data;
    const tempItems = [...list];
    tempItems[index].isHidden = value;
    setList(tempItems);
  };

  const deleteArticle = (uuid: string) => {
    axiosInstance.delete(`/post/${uuid}`).then((x) => {
      getPage();
    });
  };

  const keySearchHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setPageNumber(1);
      getPage();
    }
  };

  function editArticle(item: Article): void {
    setSelectedArticle(item);
    navigate(`/admin/edit-article/${item.uuid}`);
  }

  return (
    <div className="wrapper">
      <div className="search-block">
        <TextField
          className="search-block__input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search"
          variant="outlined"
          onKeyDown={(e) => keySearchHandler(e)}
        />
      </div>
      <TableContainer>
        <Table aria-label="simple-table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Titile</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell width={150}>
                  <div className="table-actions">
                    <IconButton
                      onClick={() => editArticle(item)}
                    >
                      <AiOutlineEdit></AiOutlineEdit>
                    </IconButton>
                    {item.isHidden ? (
                      <IconButton
                        onClick={() => setHiddenStatus(false, item, index)}
                      >
                        <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => setHiddenStatus(true, item, index)}
                      >
                        <AiOutlineEye></AiOutlineEye>
                      </IconButton>
                    )}
                    <IconButton onClick={() => deleteArticle(item.uuid)}>
                      <AiOutlineDelete></AiOutlineDelete>
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="table-pagination">
        <Select
          variant="standard"
          label="Amount"
          value={amount}
          onChange={(x) => setAmount(x.target.value as number)}
        >
          {pageAmounts.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <div className="table-pagination__number-block">
          <IconButton
            className={
              !meta?.prevPage ? "table-pagination__arrow_disabled" : ""
            }
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <AiOutlineArrowLeft></AiOutlineArrowLeft>
          </IconButton>
          <div className="table-paginagion__number">{`${pageNumber} \t of \t ${amountPages}`}</div>
          <IconButton
            className={
              !meta?.nextPage ? "table-pagination__arrow_disabled" : ""
            }
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <AiOutlineArrowRight></AiOutlineArrowRight>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
