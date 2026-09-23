{ pkgs, config, ... }:

{
  name = "marcusinthesky-portfolio";

  languages.javascript = {
    enable = true;
    bun.enable = true;
    directory = "${config.git.root}/src/typescript";
  };

  packages = with pkgs; [
    chktex
    deadnix
    git
    jq
    just
    lychee
    nixfmt-rfc-style
    poppler-utils
    prek
    rumdl
    statix
    tectonic
    tex-fmt
    tombi
  ];

  processes.web.exec = {
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
