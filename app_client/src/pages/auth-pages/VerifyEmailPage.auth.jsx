import { Alert, Box, Button, Container } from "@mui/material";
import AuthTitle from "../../components/ui/AuthTitle.ui";
import AuthBox from "../../components/ui/AuthBox.ui";

function VerifyEmailPage() {
  return (
    <Container maxWidth="sm">
      <Alert variant="standard" severity="error">
        This is an error alert — check it out!
      </Alert>
      <AuthBox>
        <AuthTitle
          title="Verify your email"
          description="your account has been successfully registered. To complate the process please check your email for a verification request."
        />
        <Box
          mt={2.5}
          gap={3}
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="stretch"
          alignItems="start"
          component="div"
        >
          {/* SUBMIT BUTTON ============================================== */}
          <Button
            type="submit"
            fullWidth
            size="large"
            className="fw-b"
            variant="contained"
            disableElevation
            sx={{ py: 1.5 }}
          >
            re-send verification request
          </Button>
        </Box>
      </AuthBox>
    </Container>
  );
}

export default VerifyEmailPage;
