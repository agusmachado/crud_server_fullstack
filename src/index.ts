import colors from "colors";
import server from "./server"

server.listen( 4000, () => {
    console.log(colors.blue.bold(`REST API en el puerto 4000`))
})