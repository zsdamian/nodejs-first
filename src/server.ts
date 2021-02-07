import {app} from "./createApp";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`STARTED ON PORT ${PORT}`);
});