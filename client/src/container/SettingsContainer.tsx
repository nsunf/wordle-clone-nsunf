import axios from "axios";
import SettingsPresenter from "../presenters/SettingsPresenter";

function SettingsContainer() {

  const onClickButton = async() => {
    if (window.confirm('really?')) {
      await axios.post('/api/destroySession')
      window.location.href = '/';
    }
  }

  return (
    <SettingsPresenter
      onClickButton={onClickButton}
    />
  );
}

export default SettingsContainer;