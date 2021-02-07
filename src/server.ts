import {app} from "./main";

export const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`STARTED ON PORT ${PORT}`);
});