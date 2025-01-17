import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { notify } from "../lib/api";

const SendNotificationForm = ({ userId, tenant }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await notify({ message, showToast, userId, email, tenant });
    setIsLoading(false);

    e.target.reset();
  };

  return (
    <form onSubmit={onSubmit}>
       <FormControl mb={3}>
        <FormLabel htmlFor="email" fontSize={14}>
          Email
        </FormLabel>
        <Input type='email' placeholder="Email to be sent the notification" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel htmlFor="message" fontSize={14}>
          Message
        </FormLabel>
        <Textarea
          id="message"
          name="message"
          placeholder="Message to be shown in the notification"
          size="sm"
          onChange={(e) => setMessage(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel fontSize={14} display="flex" alignItems="center">
          <Checkbox
            name="showToast"
            size="sm"
            isChecked={showToast}
            onChange={(e) => setShowToast(e.target.checked)}
            mr={2}
          />{" "}
          Show a toast?{" "}
        </FormLabel>
      </FormControl>

      <Button
        type="submit"
        variant="solid"
        colorScheme="gray"
        size="sm"
        isDisabled={message && email === ""}
        isLoading={isLoading}
      >
        Send notification
      </Button>
    </form>
  );
};

export default SendNotificationForm;
