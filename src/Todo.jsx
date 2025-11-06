import {Card,CardContent,Typography,Grid,IconButton} from "@mui/material";
import { DeleteForever as DeleteForeverIcon,Create as CreateIcon,Done as DoneIcon } from "@mui/icons-material";

import { useContext , useEffect } from "react";
import { useToast } from "./cotexts/ToastCotext";
import { TodoContext } from "./cotexts/TodoContext";

import { useTranslation } from 'react-i18next';
import "../public/locales/ar/translation.json"



export default function Todo({todo,showDelete,showEdit,lang}) {
  const {showToast}=useToast()
  const {todos,todosDispatch}= useContext(TodoContext)
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  function handelCheck (){
      todosDispatch({type:"checked",payload:todo})
      showToast(t( "Edited successfully")) 
  }


  const handleClickOpen = () => {
    showDelete(todo)
  };

  const handleClickOpenEdit = () => {
    showEdit(todo)
  };

  return (
    <>
    <Card className="task" 
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          marginTop: "20px",
          textAlign: "right",
          direction:t("ltr")
        }}
      >
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={8}>
              <Typography variant="h5" sx={{ display:"flex",justifyContent:"start",textDecoration:todo.checked ? "line-through" :"none", transition:".3s" , color:todo.checked? "#ffffff91":"white"}}>{todo.title}</Typography>
              <Typography variant="h6" sx={{display:"flex",justifyContent:"start",textDecoration:todo.checked ? "line-through" :"none", transition:".3s" , color:todo.checked? "#ffffff91":"white"}}>{todo.des}</Typography>
            </Grid>
            <Grid size={4}>
              <div style={{ display: "flex", alignItems: "center" ,justifyContent:"space-around",height:"100%"}}>
              <IconButton
                className="iconButt"
                aria-label="done"
                onClick={handelCheck} 
                sx={{
                  color: todo.checked ? "white" : "#8bc34a",
                  backgroundColor: todo.checked ? "#8bc34a" : "white",
                  border: "1px solid #8bc34a",
                  transition: "0.3s",
                }}
              >
                  <DoneIcon />
                </IconButton>
                <IconButton className="iconButt" onClick={handleClickOpenEdit} style={{color:"#1769aa",backgroundColor:"white",border:"#1769aa 1px solid"}}>
                  <CreateIcon />
                </IconButton>
                <IconButton className="iconButt" aria-label="delete" onClick={handleClickOpen} style={{color:"#b23c17",backgroundColor:"white",border:"#b23c17 1px solid"}}>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
