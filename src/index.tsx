import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import ChatWidget, { ChatWidgetProps } from "./ChatWidget";
import "./index.css";

class ChatBotElement extends HTMLElement {
  // Observing attributes
  static get observedAttributes() {
    return ["title", "lang", "theme", "position", "direction"];
  }

  // Handling attribute changes
  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {
    if (oldValue !== newValue) {
      console.log(
        "ChatBotElement attribute changed",
        property,
        oldValue,
        newValue
      );
      this.dataset[property] = newValue;
      this.render();
    }
  }

  connectedCallback() {
    console.log("ChatBotElement connected", this);
    this.render();
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }

  render = () => {
    const { title, lang, theme, position, direction } = this.dataset;
    const props: ChatWidgetProps = {
      id: this.id,
      title,
      lang,
      theme,
      position,
      direction,
    };

    console.log("ChatBotElement props", props);

    ReactDOM.render(<ChatWidget {...props} />, this, () => {
      this.style.display = "block";
    });
  };
}

customElements.define("chat-bot-widget", ChatBotElement);

if (process.env.NODE_ENV === "development") {
  const rootElement = document.getElementById("root");

  if (rootElement) {
    const root = createRoot(rootElement);
    const props = {
      id: "chat-widget",
      title: "Chatbot",
      lang: "en",
      theme: "light",
      position: "bottom-right",
      direction: "ltr",
    };

    root.render(
      <StrictMode>
        <ChatWidget {...props} />
      </StrictMode>
    );
  }
}
