#nix
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.dotnet-sdk_8
    pkgs.dotnet-runtime_8
    pkgs.dotnet-aspnetcore_8
    pkgs.csharpier
    pkgs.nginx
    pkgs.nuget
    pkgs.gnumake42
  ];

  # Sets environment variables in the workspace
  env = {
    ASPNETCORE_ENVIRONMENT = "Development";
  };

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "ms-dotnettools.vscode-dotnet-runtime"
      "muhammad-sammy.csharp"
      "k--kato.docomment"
      "editorconfig.editorconfig"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["dotnet" "watch" "run" "--project" "/home/user/BackendLXP/src/LXP.API/LXP.Api.csproj" "--launch-profile" "http"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        dotnet-restore = "dotnet restore /home/user/BackendLXP/src/LXP.API/LXP.Api.csproj";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # This is handled by the web preview now
      };
    };
  };
}
