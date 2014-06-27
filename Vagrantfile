# -*- mode: ruby -*-
# vi: set ft=ruby :



# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "jessie64"
  config.vm.box_url = "https://downloads.sourceforge.net/project/vagrantboxjessie/debian80.box"

  # Network configuration
  config.vm.network :forwarded_port, guest: 9000, host: 9000
  config.vm.network :forwarded_port, guest: 35729, host: 35729

  config.vm.provision "shell" do |s|
    s.path = "scripts/vagrant.sh"
    s.privileged = false
  end

  config.vm.synced_folder ".", "/vagrant", :mount_options => ["dmode=777","fmode=666"]
end
