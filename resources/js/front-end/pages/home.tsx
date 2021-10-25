import React, { FC, useEffect, useState } from "react";
import {
    Box,
    Button,
    Modal,
    Typography,
    Backdrop,
    Fade,
    CircularProgress as Loader,
} from "@material-ui/core";
import { IUser } from "../types/user";
import { IUrl } from "../types/url";
import { getAllUrls } from "../services/url";
import Table from "../components/table";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router";
import { useSnackbar } from "react-simple-snackbar";
const beautify_html = require("js-beautify").html;

type THomeProps = {
    logOutCallback: () => void;
    user: IUser;
};

const Home: FC<THomeProps> = ({ logOutCallback, user }) => {
    const [refresher, setRefresher] = useState<string>("");
    const [urls, setUrls] = useState<Array<IUrl>>([]);
    const [open, setOpen] = React.useState(false);
    const [openSnackbar, _] = useSnackbar();
    const [selectedItem, setSelectedItem] = useState<IUrl>();
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const handleRefresh = () => setRefresher(uuid as any);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await getAllUrls().then((res) => {
                    setUrls(res.data);
                });
            } catch (err) {
                Object.values(err).map((x) => {
                    openSnackbar(x);
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [refresher]);

    const handleShowHTML = (id: number) => {
        setSelectedItem(urls.filter((url) => url.id === id)[0]);
        if (selectedItem?.html) handleOpenModal();
    };

    return (
        <Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                textAlign="center"
            >
                <Typography variant="h3">{`${user?.name}'s URLs`}</Typography>
                <Box display="flex" style={{ gap: 10 }}>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/url/create")}
                    >
                        Create new URL
                    </Button>
                    <Button variant="contained" onClick={handleRefresh}>
                        Refresh table
                    </Button>
                    <Button variant="contained" onClick={logOutCallback}>
                        logout
                    </Button>
                </Box>
            </Box>
            <Box>
                {loading ? (
                    <Loader />
                ) : (
                    <Table urls={urls} onClickCallback={handleShowHTML} />
                )}
            </Box>

            <Modal
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            borderWidth: 1,
                            backgroundColor: "#FFF",
                            padding: 5,
                            height: 700,
                            width: 700,
                        }}
                    >
                        {selectedItem && (
                            <Box
                                display="flex"
                                flexDirection="column"
                                style={{ gap: 20 }}
                            >
                                <Typography variant="h4">
                                    {selectedItem.url}
                                </Typography>
                                <p
                                    style={{
                                        width: 600,
                                        height: 600,
                                        overflow: "scroll",
                                    }}
                                >
                                    {beautify_html(selectedItem.html)}
                                </p>
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default Home;
