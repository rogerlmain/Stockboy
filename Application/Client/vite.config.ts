import react from "@vitejs/plugin-react-swc";
import child_process from "child_process";
import fs from "fs";
import path from "path";

import { env } from "process";
import { defineConfig } from "vite";


const baseFolder = env.APPDATA !== undefined && env.APPDATA !== '' ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;
const certificateName = "template.client";
const certFilePath = path.join (baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join (baseFolder, `${certificateName}.key`);
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split (";")[0] : "https://localhost:7006";


if (!fs.existsSync (certFilePath) || !fs.existsSync (keyFilePath)) {
	if (0 !== child_process.spawnSync ("dotnet", [
		"--export-path",
		"--format",
		"--no-password",
		"dev-certs",
		"https",
		"Pem",
		certFilePath,
	], { stdio: "inherit", }).status) {
		throw new Error ("Could not create certificate.");
	}
}


export default defineConfig ({
	plugins: [react ({ tsDecorators: true })],
	resolve: {
		alias: {
			Classes: "/src/Classes",
			Controls: "/src/Controls",
			Forms: "/src/Forms",
			Models: "/src/Models",
			Pages: "/src/Pages",
		}
	},
	server: {
		proxy: {
			"^/weatherforecast": {
				target,
				secure: false
			}
		},
		port: 5173,
		https: {
			key: fs.readFileSync (keyFilePath),
			cert: fs.readFileSync (certFilePath),
		}
	}
})
