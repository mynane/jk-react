import Api from "../common/Api";
import Auth from "../common/Auth";
import Config from "../common/Config";
import Form from "../common/Form";
import Loading from "../common/Loading";
import Login from "../common/Login";
import Step from "../common/Step";
import Template from "../common/Template";
import Token from "../common/Token";
import User from "../common/User";
import Version from "../common/Version";
import Website from "../common/Website";
import app from "./Application";

const providers = [Login, Api, Token, User, Form, Auth, Loading, Version, Config, Website, Template, Step];

app.providers(providers);

app.start();
