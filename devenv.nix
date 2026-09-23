{
  pkgs,
  lib,
  config,
  ...
}:

{
  name = "marcusinthesky-portfolio";

  languages.javascript = {
    enable = true;
    bun.enable = true;
    directory = "${config.git.root}/src/typescript";
  };

  packages = with pkgs; [
    deadnix
    git
    jq
    just
    lychee
    nixfmt
    poppler-utils
    prek
    ripgrep
    rumdl
    statix
    tectonic
    tex-fmt
    texlivePackages.chktex
    tombi
  ];

  # Playwright's downloaded browsers cannot load their shared libraries on NixOS.
  env = lib.optionalAttrs pkgs.stdenv.isLinux {
    PLAYWRIGHT_EXECUTABLE_PATH = lib.getExe pkgs.chromium;
  };

  processes.web = {
    exec = "just dev";
    cwd = config.git.root;
  };

  tasks."quality:check" = {
    exec = "just check";
    cwd = config.git.root;
  };

  enterTest = ''
    just --version
    bun --version
    tectonic --version
  '';
}
